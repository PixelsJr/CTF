import React, { useState } from 'react';

function CreatedOffers({ offers }) {
  const [expandedOffer, setExpandedOffer] = useState(null);

  // If no offers created
  if (!offers || offers.length === 0) {
    return (
      <div className="created-offers">
        <h2>My Created Offers</h2>
        <p>You haven't created any offers yet.</p>
      </div>
    );
  }

  const toggleExpand = (offerId) => {
    if (expandedOffer === offerId) {
      setExpandedOffer(null);
    } else {
      setExpandedOffer(offerId);
    }
  };

  // Calculate total earnings from created offers
  const totalEarnings = offers.reduce((total, offer) => {
    // We could add sales tracking in the future
    // For now, we'll just display potential earnings
    return total + offer.price;
  }, 0);

  return (
    <div className="created-offers">
      <div className="created-offers-header">
        <h2>My Created Offers</h2>
        <div className="created-offers-stats">
          <span>Total Offers: {offers.length}</span>
          <span>Potential Value: ${totalEarnings}</span>
        </div>
      </div>
      
      <div className="created-offers-list">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className={`created-offer-item ${expandedOffer === offer.id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(offer.id)}
          >
            <div className="created-offer-summary">
              <div className="created-offer-image">
                {offer.image && (
                  <img 
                    src={`/api/get_image.php?filename=${offer.image}`} 
                    alt={offer.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                )}
              </div>
              <div className="created-offer-info">
                <h3>{offer.name}</h3>
                <div className="created-offer-price">${offer.price}</div>
              </div>
              <div className="created-offer-arrow">
                {expandedOffer === offer.id ? '▼' : '▶'}
              </div>
            </div>
            
            {expandedOffer === offer.id && (
              <div className="created-offer-details">
                <p>{offer.description}</p>
                <div className="created-offer-reviews">
                  <h4>Reviews ({offer.reviews ? offer.reviews.length : 0})</h4>
                  {offer.reviews && offer.reviews.length > 0 ? (
                    <ul>
                      {offer.reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatedOffers;
