import PageNav from '../components/PageNav';

function PageNotFound() {
  return (
    <div>
      {/* 
      - Importing Links to navigate across different Pages
       */}
      <PageNav />
      <h1>Page Not Found :(</h1>
    </div>
  );
}

export default PageNotFound;
