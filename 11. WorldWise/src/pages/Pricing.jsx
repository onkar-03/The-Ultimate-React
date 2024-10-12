// Uses the same styles as Product
import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            The free plan includes essential features like logging up to 10
            countries and basic map functionality. For more advanced travelers,
            the premium plans offer unlimited country tracking, personalized
            travel stats, and detailed insights. With affordable monthly or
            yearly subscriptions, World Wise ensures that everyone can manage
            their travels with ease and efficiency
          </p>
        </div>
        <img src='img-2.jpg' alt='overview of a large city with skyscrapers' />
      </section>
    </main>
  );
}
