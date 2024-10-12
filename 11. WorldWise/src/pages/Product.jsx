import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src='img-1.jpg'
          alt='person with dog overlooking mountain with sunset'
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            World Wise is a smart travel app that helps users track the
            countries they’ve visited. With an interactive world map, you can
            log your trips, add personal notes, and visualize your travel
            history. It's an easy way to see where you’ve been and plan where to
            go next
          </p>
          <p>
            The app also provides personalized travel stats and lets you create
            a “bucket list” of future destinations. Whether you're a casual
            explorer or an avid traveler, World Wise keeps your journeys
            organized and inspires new adventures
          </p>
        </div>
      </section>
    </main>
  );
}
