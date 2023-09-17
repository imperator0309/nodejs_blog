class NewsController {
    //GET /news
    index(req, res) {  
        res.render('news');
    }
    
    //GET /news:slug
    show(req, res) {
        res.send('<h2>NEWS DETAIL!</h2>');
    }
}

module.exports = new NewsController;