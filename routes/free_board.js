const express = require('express');
const router = express.Router();
const db = require('../config/db');

const POSTS_PER_PAGE = 5;

// GET /free - 자유게시판 목록
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * POSTS_PER_PAGE;
    const searchTerm = req.query.search || '';

    try {
        let query = 'SELECT * FROM free_board';
        let countQuery = 'SELECT COUNT(*) as count FROM free_board';
        const params = [];

        if (searchTerm) {
            query += ' WHERE title LIKE ?';
            countQuery += ' WHERE title LIKE ?';
            params.push(`%${searchTerm}%`);
        }

        query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
        params.push(POSTS_PER_PAGE, offset);

        const [rows] = await db.query(query, params);
        const [[{ count }]] = await db.query(countQuery, params.slice(0, searchTerm ? 1 : 0));

        res.render('free_board/list', {
            posts: rows,
            currentPage: page,
            totalPages: Math.ceil(count / POSTS_PER_PAGE),
            searchTerm: searchTerm
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /free/new - 자유게시판 작성 폼
router.get('/new', (req, res) => {
    res.render('free_board/form', { post: null });
});

// POST /free/new - 자유게시판 작성
router.post('/new', async (req, res) => {
    const { title, author, content } = req.body;
    try {
        await db.query('INSERT INTO free_board (title, author, content) VALUES (?, ?, ?)', [title, author, content]);
        res.redirect('/free');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /free/:id - 자유게시판 상세 보기
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE free_board SET views = views + 1 WHERE id = ?', [id]);
        const [[post]] = await db.query('SELECT * FROM free_board WHERE id = ?', [id]);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('free_board/view', { post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /free/:id/edit - 자유게시판 수정 폼
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const [[post]] = await db.query('SELECT * FROM free_board WHERE id = ?', [id]);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('free_board/form', { post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /free/:id/edit - 자유게시판 수정
router.post('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { title, author, content } = req.body;
    try {
        await db.query('UPDATE free_board SET title = ?, author = ?, content = ? WHERE id = ?', [title, author, content, id]);
        res.redirect(`/free/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST /free/:id/delete - 자유게시판 삭제
router.post('/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM free_board WHERE id = ?', [id]);
        res.redirect('/free');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
