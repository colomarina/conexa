import styles from '@/styles/components/atoms/Card.module.css';

const LoadingCard = () => {
  return (
    <div className='col-12'>
      <div className='placeholder-glow'>
        <div className=''>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`card mb-2 ${styles.characterCard} ${styles.characterCardHorizontal}`}
            >
              <div className='row'>
                <div className='col-6 d-flex justify-content-center align-items-center'>
                  <div
                    className='placeholder rounded-4 ms-3 bg-secondary'
                    style={{ width: '125px', height: '125px' }}
                  />
                </div>
                <div className='col-6 d-flex flex-column justify-content-between my-2'>
                  <div className='placeholder col-8 bg-secondary' />
                  <div className='placeholder col-6 bg-secondary' />
                  <div className='placeholder col-10 bg-secondary' />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <span className='placeholder col-2 bg-secondary'></span>
          <span className='placeholder col-3 bg-secondary'></span>
          <span className='placeholder col-2 bg-secondary'></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
