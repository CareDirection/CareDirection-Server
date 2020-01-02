

exports.insertMainArticle = (Transaction, req, next, currentTime) => {
  return Transaction(async (connection) => {
    const Query1 = `
    INSERT INTO article(article_title, article_content, article_date) VALUES("${req.body.article_title}", "${req.body.article_content}", "${currentTime}");
    `
    await connection.query(Query1)
    const Query2 = `
    SELECT article_idx FROM article WHERE article_title = "${req.body.article_title}"
    `
    const article_idx = await connection.query(Query2)
    const Query3 = `
    INSERT INTO image(article_idx, image_key, image_original_name, image_size) VALUES(${article_idx[0].article_idx}, "${req.file.transforms[0].key}", "${req.file.originalname}", "${req.file.transforms[0].size}" )`
    await connection.query(Query3)
  }).catch(error => {
    return next(error)
  })
}

exports.insertSubArticle = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
    INSERT INTO sub_article(article_idx, sub_article_title, sub_article_content) VALUES(${req.params.article_idx},"${req.body.sub_article_title}", "${req.body.sub_article_content}");`
    await connection.query(Query1)
    const Query2 = `
    SELECT sub_article_idx FROM sub_article WHERE sub_article_title = "${req.body.sub_article_title}"`
    const sub_article_idx = await connection.query(Query2)
    const Query3 = `
    INSERT INTO image(sub_article_idx, image_key, image_original_name, image_size) VALUES(${sub_article_idx[0].sub_article_idx}, "${req.file.transforms[0].key}", "${req.file.originalname}", "${req.file.transforms[0].size}" )`
    await connection.query(Query3)
  }).catch(error => {
    return next(error)
  })
}

exports.getArticleList = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'select image_key, article_idx, article_title, article_content FROM article JOIN image USING (article_idx);'
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getArticle = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const image = []
    const Query1 = `
    select distinct image_key, article_title, article_content, article_date from article join image using(article_idx) where article_idx = ${req.params.article_idx}`
    const main = await connection.query(Query1)
    const Query2 = `
    select image_key, sub_article_title, sub_article_content  FROM (sub_article s JOIN image i USING (sub_article_idx)) JOIN article a ON (a.article_idx = s.article_idx) WHERE s.article_idx = ${req.params.article_idx};`
    const sub_contents = await connection.query(Query2)
    const result = {
      main_contents: main[0],
      sub_contents,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}
