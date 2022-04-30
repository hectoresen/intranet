
const isAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        console.log('Es admin');
        return next();
    } else {
        console.log('No es admin');
        return res.send(403);
    }
}


module.exports = {
    isAdmin,
}