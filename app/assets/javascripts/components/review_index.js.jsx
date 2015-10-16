(function(root) {
  // this.props.worker
  'use strict';

  root.ReviewIndex = React.createClass({
    getInitialState: function() {
      // NOTE: Idealy, want to limit this reviews state to only a few reviews
      // via pagination. for now, will just fetch them all!
      return ({
        reviews: ReviewStore.all()
      });
    },

    _updateReviews: function() {
      this.setState({
        reviews: ReviewStore.all()
      });
    },

    componentDidMount: function() {
      ApiUtil.fetchReviews(this.props.worker);
      ReviewStore.addChangeListener(this._updateReviews);
    },

    componentWillUnmount: function() {
      ReviewStore.removeChangeListener(this._updateReviews);
    },

    // NOTE: instead of mapping, it seems like this might be better served by
    // doing a this.props.children ? unsure how to implement right now
    render: function() {
      var reviews = this.state.reviews;
      // after get this base started, change map to
      // <Review review={review} />

      return (
        <div>
          ReviewIndex placeholder
          {reviews.map(function(review) {
            return (
              <div key={review.id}>
                review goes here
              </div>);
          })}
        </div>
      );
    }
  });

}(this));
