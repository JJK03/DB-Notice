# Node.js & Express 게시판

Node.js, Express, MySQL을 사용한 간단한 공지사항 및 자유 게시판입니다.

## 주요 기능

-   게시물 목록 표시 및 페이지네이션
-   게시물 상세 보기 및 조회수 증가
-   게시물 작성, 수정, 삭제 (CRUD)
-   제목으로 게시물 검색

## 설치 및 실행 방법

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone https://github.com/JJK03/DB-NodejsExpress-Homepage-MySQL.git
cd DB-NodejsExpress-Homepage-MySQL
npm install
```

### 2. 데이터베이스 설정

1.  사용 중인 MySQL 서버에 접속하여 데이터베이스를 생성합니다.

    ```sql
    CREATE DATABASE your_database_name;
    ```

2.  `config/db.js` 파일을 열고 본인의 데이터베이스 정보를 입력합니다.

    ```javascript
    const dbConfig = {
        host: 'localhost',
        user: 'your_username',     // ✏️ DB 사용자 이름을 입력하세요.
        password: 'your_password', // ✏️ DB 비밀번호를 입력하세요.
        database: 'your_database_name' // ✏️ 생성한 DB 이름을 입력하세요.
    };
    ```

3.  `schema.sql` 파일의 쿼리를 실행하여 `notice`와 `free_board` 테이블을 생성합니다.
    (MySQL 클라이언트나 GUI 도구에서 `schema.sql` 파일의 내용을 복사하여 실행하세요.)

### 3. 애플리케이션 실행

다음 명령어를 사용하여 서버를 시작합니다.

```bash
node app.js
```

서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속할 수 있습니다.

## 프로젝트 구조

```
.
├── app.js              # Express 서버 메인 파일
├── package.json
├── schema.sql          # 테이블 생성 SQL
├── config
│   └── db.js           # 데이터베이스 연결 설정
├── public
│   └── css
│       └── style.css   # 전역 스타일시트
├── routes
│   ├── free_board.js   # 자유게시판 라우터
│   └── notice.js       # 공지사항 라우터
└── views
    ├── free_board      # 자유게시판 뷰
    │   ├── form.ejs
    │   ├── list.ejs
    │   └── view.ejs
    ├── notice          # 공지사항 뷰
    │   ├── form.ejs
    │   ├── list.ejs
    │   └── view.ejs
    └── partials        # 재사용 뷰 (헤더, 푸터 등)
        ├── footer.ejs
        ├── header.ejs
        └── pagination.ejs
```
