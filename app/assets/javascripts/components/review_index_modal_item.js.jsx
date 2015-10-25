(function(root) {
  // this.props.review
  'use strict';

  var Glyphicon = ReactBootstrap.Glyphicon;
  root.ReviewIndexModalItem = React.createClass({
    render: function() {
      var review = this.props.review;
      if (typeof review !== undefined) {
        return (
          <div className="panel row" id="review-entry">
            <div className="reviewer-profile-pic-container">
              <img
                className="reviewer-profile-pic"
                src={review.reviewer.image}>
                <strong className={review.isGood ? "review-icon-holder-ok" : "review-icon-holder-bad"}>
                  <Glyphicon
                    glyph={review.isGood ? "thumbs-up": "thumbs-down"}
                    id="review-icon" />
                </strong>
              </img>
            </div>

            <div className="review-info">
              {review.description}<br/>
              {review.created_at}  {review.reviewer.shortName}<br/>
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
