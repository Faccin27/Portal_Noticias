const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define o diretório de uploads
const uploadDir = "./src/uploads/";

// Cria o diretório se não existir
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define o armazenamento dos arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Adiciona um timestamp e a extensão do arquivo ao nome
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Função de filtro para tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|jfif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Tipo de arquivo não suportado"));
    }
};

// Configurações do Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de tamanho do arquivo em bytes (2MB)
});

module.exports = upload;
