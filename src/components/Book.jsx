import { useState } from 'react';
import './Book.css';

const Book = ({ bookData }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(-1); // -1 for cover
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('');

  // Flatten all pages with chapter info
  const allPages = [];
  bookData.chapters.forEach(chapter => {
    chapter.pages.forEach((page, index) => {
      allPages.push({
        ...page,
        chapterTitle: chapter.title,
        isFirstPageOfChapter: index === 0
      });
    });
  });

  const totalPages = allPages.length;

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex >= -1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const jumpToChapter = (chapterId) => {
    const chapterFirstPage = allPages.findIndex(
      page => page.chapterTitle === bookData.chapters.find(ch => ch.id === chapterId)?.title &&
              page.isFirstPageOfChapter
    );
    if (chapterFirstPage !== -1) {
      setCurrentPageIndex(chapterFirstPage);
    }
  };

  const currentPage = currentPageIndex >= 0 ? allPages[currentPageIndex] : null;
  const nextPage = currentPageIndex >= 0 && currentPageIndex < totalPages - 1 ? allPages[currentPageIndex + 1] : null;

  return (
    <div className="book-container">
      <div className="book-wrapper">
        <div className={`book ${isFlipping ? 'flipping' : ''} ${flipDirection}`}>
          {/* Left Page */}
          <div className="page left-page">
            {currentPageIndex === -1 ? (
              <div className="cover-page">
                <div className="cover-content">
                  <h1 className="book-title">{bookData.cover.title}</h1>
                  <p className="book-subtitle">{bookData.cover.subtitle}</p>
                  <p className="book-author">by {bookData.cover.author}</p>
                </div>
              </div>
            ) : currentPage ? (
              <div className="page-content">
                {currentPage.isFirstPageOfChapter && (
                  <h3 className="chapter-title">{currentPage.chapterTitle}</h3>
                )}
                <div className="text-content">{currentPage.content}</div>
                <p className="page-number">{currentPageIndex + 1}</p>
              </div>
            ) : null}
          </div>

          {/* Right Page */}
          <div className="page right-page">
            {currentPageIndex === -1 ? (
              <div className="first-page">
                <h2>Table of Contents</h2>
                <div className="toc">
                  {bookData.chapters.map(chapter => (
                    <div
                      key={chapter.id}
                      className="toc-item"
                      onClick={() => jumpToChapter(chapter.id)}
                    >
                      {chapter.title}
                    </div>
                  ))}
                </div>
              </div>
            ) : nextPage ? (
              <div className="page-content">
                {nextPage.isFirstPageOfChapter && (
                  <h3 className="chapter-title">{nextPage.chapterTitle}</h3>
                )}
                <div className="text-content">{nextPage.content}</div>
                <p className="page-number">{currentPageIndex + 2}</p>
              </div>
            ) : (
              <div className="page-content">
                <div className="the-end">
                  <h2>The End</h2>
                  <p>To be continued...</p>
                </div>
              </div>
            )}
          </div>

          {/* Page flip animation overlay */}
          <div className={`flip-page ${flipDirection}`}></div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="navigation">
        <button
          className="nav-button prev"
          onClick={goToPreviousPage}
          disabled={currentPageIndex === -1 || isFlipping}
        >
          ← Previous
        </button>

        <div className="page-indicator">
          {currentPageIndex === -1 ? 'Cover' : `Page ${currentPageIndex + 1} of ${totalPages}`}
        </div>

        <button
          className="nav-button next"
          onClick={goToNextPage}
          disabled={currentPageIndex === totalPages - 1 || isFlipping}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Book;
