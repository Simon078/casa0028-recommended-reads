export default function BookListItem({ book }) {
  // 书名
  const title = book.title;

  // 作者（OpenLibrary 返回的是数组）
  const author = book.author_name ? book.author_name[0] : "Unknown Author";

  // 封面 key
  const coverKey = book.cover_edition_key;

  // 封面 URL（老师讲义格式）
  const coverUrl = coverKey
    ? `https://covers.openlibrary.org/b/olid/${coverKey}-M.jpg`
    : null;

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px",
        border: "1px solid #eee",
        borderRadius: "10px",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      {/* 封面图片 */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={title}
          style={{
            width: "60px",
            height: "90px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      ) : (
        <div
          style={{
            width: "60px",
            height: "90px",
            background: "#ddd",
            borderRadius: "6px",
          }}
        />
      )}

      {/* 文字信息 */}
      <div>
        <h3 style={{ margin: 0, fontSize: "15px" }}>{title}</h3>
        <p style={{ margin: 0, fontSize: "13px", opacity: 0.7 }}>
          {author}
        </p>
      </div>
    </div>
  );
}
