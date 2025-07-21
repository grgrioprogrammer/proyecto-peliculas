const Book = require('../models/Book');

// Obtener todos los libros del usuario autenticado
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros', error: error.message });
  }
};

// Agregar un nuevo libro
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Título y autor son obligatorios.' });
    }
    const book = new Book({
      title,
      author,
      user: req.user.userId
    });
    await book.save();
    res.status(201).json({ message: 'Libro agregado correctamente', book });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el libro', error: error.message });
  }
};

// Marcar libro como leído
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { status: 'leído' },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro marcado como leído', book });
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar como leído', error: error.message });
  }
};

// Eliminar libro
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado', book });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro', error: error.message });
  }
};
