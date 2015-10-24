(function(root) {
  // this.props.review
  'use strict';

  root.ReviewIndexModalItem = React.createClass({
    render: function() {
      var review = this.props.review;
      if (typeof review !== undefined) {
        return (
          <div className="panel row" id="review-entry">
            <img
              className="reviewer-profile-pic"
              src={ "https://robohash.org/" + review.reviewer_id  + "?bgset=any" } />
            <div className="review-info">
              {review.is_positive}<br/>
              {review.description}<br/>
              {review.created_at}  {review.reviewer}<br/>
            </div>
          </div>
        );
      } else {
        return (<div>Loading...</div>);
      }
    }
  });
}(this));

// review.task.datetime (just need date, not interval)
// review.is_positive
// review.description
// review.task.creator.email
