const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

///
const targetDir = './deploy';
const targetFiles = [];

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

const layoutHtmlFormat = fs.readFileSync('./templates/index_layout.html', 'utf8');
const articleWrapperFormat = fs.readFileSync('./templates/article_wrapper.html', 'utf8');
const listHtmlFormat = fs.readFileSync('./templates/lists.html', 'utf8');
const articleHtmlFormat = fs.readFileSync('./templates/article.html', 'utf8');

///

const contentDir = './contents';
const categories = fs.readdirSync(contentDir);
console.log(categories);

let content = [];

categories.forEach((categoryDir) => {
  let curContent = {
    category: categoryDir,
    files: [],
  };

  // read
  const categoryReadDir = path.join(contentDir, categoryDir);
  const categoryDirContent = fs.readdirSync(categoryReadDir);

  // write to deploy
  const categoryWriteDir = path.join(targetDir, categoryDir);
  if (!fs.existsSync(categoryWriteDir)) {
    fs.mkdirSync(categoryWriteDir);
  }

  categoryDirContent.forEach((file) => {
    const fileReadDir = path.join(categoryReadDir, file);
    const fileWriteDir = path.join(categoryWriteDir, file);
    const curFileContent = fs.readFileSync(fileReadDir, 'utf-8');
    const fileStat = fs.statSync(fileReadDir);
    const filename = path.parse(file).name;
    curContent.files.push({
      file,
      fileStat,
    });

    let fileEjsContent = ejs.render(articleHtmlFormat, { article_content: curFileContent });
    fileEjsContent = ejs.render(articleWrapperFormat, {
      title: `${filename}`,
      content: fileEjsContent,
    });

    targetFiles.push(fileEjsContent);

    fs.writeFileSync(fileWriteDir, fileEjsContent);
  });

  content.push(curContent);
});

// file lists
content.forEach((cur) => {
  const category = cur.category;
  const files = cur.files;

  const lists = files.map(({ file, fileStat }) => {
    const filename = path.parse(file).name;
    const modifiedTime = fileStat.mtime;

    const mYear = modifiedTime.getFullYear();
    const mMonth = `0${modifiedTime.getMonth() + 1}`.slice(-2);
    const mDay = `0${modifiedTime.getDate()}`.slice(-2);

    const mHH = `0${modifiedTime.getHours()}`.slice(-2);
    const mMM = `0${modifiedTime.getMinutes()}`.slice(-2);
    const mSS = `0${modifiedTime.getSeconds()}`.slice(-2);

    return {
      link: `/deploy/${category}/${filename}.html`,
      name: `${filename}`,
      modifiedTime: `${mYear}.${mMonth}.${mDay} ${mHH}:${mMM}:${mSS}`,
    };
  });

  let categoryEjsContent = ejs.render(listHtmlFormat, {
    lists: lists,
  });

  categoryEjsContent = ejs.render(articleWrapperFormat, {
    title: category,
    content: categoryEjsContent,
  });

  fs.writeFileSync(`${targetDir}/${category}.html`, categoryEjsContent);
});

console.log(content);

// category lists
const categoriesEjsList = ejs.render(listHtmlFormat, {
  lists: content.map((category) => {
    return {
      link: `/deploy/${category.category}.html`,
      name: category.category,
      num: category.files.length,
    };
  }),
});

const indexEjsContent = ejs.render(layoutHtmlFormat, {
  title: 'Categories',
  content: categoriesEjsList,
});

// index.html file
fs.writeFileSync('./index.html', indexEjsContent);
