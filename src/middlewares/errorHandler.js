const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message:"Ocurrio un error en el servidor", error: err})
};

export default errorHandler

