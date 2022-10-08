

import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useFlickrSearchResults } from '../customHooks/flickr';


// TODO: import from some single file of global constants
const FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';
const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';

// Object destructuring in function parameter list
//


const FlickrImage = ({ photo, size }) => {
  // const {photo, size} = props;

  const dispatch = useDispatch()

  function handleClick(){
    dispatch({ type: 'favouritePhotos/added', payload: photo }) // ???
  }

  return (
    <img
       src={`https://live.staticflickr.com/${ photo.server }/${ photo.id }_${photo.secret}_${ size }.jpg`}
       alt={ photo.title }
       onClick={ handleClick }
    />
  );

}; // generateImageURL()

function ThumbnailGallery(props){

  const counter = useSelector( state => state.counter )
  const dispatch = useDispatch()

  // This is a 'reactive' hook function - i.e.,
  // if the router params change, our function will be forced
  // to re-run (which is a re-render)
  const params = useParams(); 

  const {loading, results, error} = useFlickrSearchResults(params.searchText)

  // equivalent of componentDidMount()
  

  if(error){
    return <p>Error loading from API.</p>
  }

  return (
    <div className="thumbnails">

        <h3>
          Results for "{ params.searchText }":
        </h3>

        <p>
          Redux store counter: { counter }
          <br/>
          <button onClick={() => dispatch({ type: 'clickCounter/incrementedBy', payload: 5 })}>
            Increment by 5
          </button>
        </p>

      {
        loading
        ?
        <p>Loading results...</p>
        :
        results.map( photo => <FlickrImage photo={photo} size="q" key={photo.id} /> )
      }
    </div>
  )



}

/******************************************* 
class ThumbnailGallery extends React.Component {


  state = {
    resultPhotos: [],
    loading: false,  // controls whether or not to show loading message
    error: null  // whether or not to show an error message
  }


  // As soon as this component is mounted on the DOM
  // (by the router), it knows it will have a search
  // query in the path (which it can acces via the
  // router params), and it should do an AJAX request
  // to the Flickr API immediately
  componentDidMount(){
    this.performSearch( this.props.match.params.searchText );
  } // componentDidMount()

  componentDidUpdate( prevProps, prevState ){

    // This lifecycle method runs when EITHER props OR state of this 
    // component have just updated

    // GOTCHA: if you do your state-changing AJAX request here,
    // you will still have an infinite loop because the setState
    // in the AJAX request will get us back into this componentDidUpdate
    // function!
    // this.performSearch( this.props.match.params.searchText)

    // You need to check if it's the particular props or state you 
    // are responding to that has changed before you do your AJAX request
    if( prevProps.match.params.searchText !== this.props.match.params.searchText ){
      this.performSearch( this.props.match.params.searchText)
    }

  }


  performSearch = async (query) => {
    console.log('FlickrSearch::performSearch()', query);

    // If we don't do this, we never see the loading message
    this.setState({ loading: true });

    // When you refactor to use unique Route components,
    // you will need to use componentDidMount() in your
    // FlickrSearchResults component - similar to the
    // Creepy Dentist <ProcedureSearchResults> component

    // componentDidUpdate() -- look into this and the args it gives you
    // to work out how to do a new search from a search results route
    // (assuming the search form is visible on every route)
    // BEWARE OF INFINITE LOOPS - turn off the axios.get() and
    // do a console.log instead while testing this!!!

    const flickrParams = {
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: 1,
      text: query // should come from user input
    };

    // axios.get( FLICKR_BASE_URL, { params: flickrParams } )
    //  .then( res => {
    //     console.log('response', res.data);
    //  })
    //  .catch( err => {
    //    console.log('Error in search AJAX: ', err);
    //  });

    try {
      const res = await axios.get( FLICKR_BASE_URL, {params: flickrParams} );
      console.log('response', res.data);
      this.setState({
        resultPhotos: res.data.photos.photo,
        loading: false  // stop showing loading message
      });
    } catch( err ){
       console.log('Error in search AJAX: ', err);
       this.setState({ error: err, loading: false });
    }


  }; // performSearch()




  render(){

    // Handle the special case where there is an error
    if( this.state.error !== null ){
      // early return; never reach the later 'return'
      return <p>Sorry, there was an error loading your results. Try again.</p>;
    }


    return (
      <div className="thumbnails">

        <h3>
          Results for "{ this.props.match.params.searchText }":
        </h3>

      {
        this.state.loading
        ?
        <p>Loading results...</p>
        :
        this.state.resultPhotos.map( photo => <FlickrImage photo={photo} size="q" /> )
      }
      </div>
    );

  } // render()

} // class ThumbnailGallery
***********************************/

export default ThumbnailGallery;
