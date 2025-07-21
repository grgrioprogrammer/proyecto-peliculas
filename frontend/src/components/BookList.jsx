import { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/books', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !author) return setError('Completa todos los campos');
    const res = await fetch('http://localhost:4000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title, author })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message || 'Error al agregar libro');
    setTitle(''); setAuthor('');
    fetchBooks();
  };

  const handleMarkAsRead = async (id) => {
    await fetch(`http://localhost:4000/api/books/${id}/read`, {
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/books/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    fetchBooks();
  };

  return (
    <div>
      <h2 style={{color: 'var(--color-primary)'}}>Tus libros</h2>
      <form onSubmit={handleAdd} style={{marginBottom: 24}}>
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} />
        <button type="submit">Agregar libro</button>
        {error && <div style={{color: 'var(--color-danger)', marginTop: 8}}>{error}</div>}
      </form>
      {loading ? <div>Cargando...</div> : (
        <ul style={{listStyle: 'none', padding: 0}}>
          {books.length === 0 && <li style={{color: 'var(--color-text-secondary)'}}>No tienes libros aún.</li>}
          {books.map(book => (
            <li key={book._id} style={{background: book.status === 'leído' ? '#222' : 'transparent', marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid var(--color-primary-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <strong>{book.title}</strong> <span style={{color: 'var(--color-accent)'}}>de {book.author}</span>
                <div style={{fontSize: 15, color: book.status === 'leído' ? '#fff' : 'var(--color-text-secondary)', fontWeight: book.status === 'leído' ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: 6}}>
                  {book.status === 'leído' ? (
                    <>
                      Leído
                      <svg width="17" height="13" viewBox="0 0 22 18" style={{marginLeft: 2}} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 13.5L2.5 8.5L1 10L7.5 16.5L21 3L19.5 1.5L7.5 13.5Z" fill="#fff" stroke="#fff" strokeWidth="1.5"/>
                      </svg>
                    </>
                  ) : (
                    book.status
                  )}
                </div>
              </div>
              <div style={{display: 'flex', gap: 8}}>
                {book.status !== 'leído' && <button style={{background: 'var(--color-accent)'}} onClick={() => handleMarkAsRead(book._id)}>Marcar como leído</button>}
                <button style={{background: 'var(--color-danger)', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, padding: 0}} onClick={() => handleDelete(book._id)} aria-label="Eliminar libro">
                  <span style={{fontWeight: 'bold', fontSize: 28, lineHeight: 1, color: '#fff'}}>×</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
