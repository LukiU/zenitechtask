import React, {Component} from 'react';
import REACT_APP_FLICKR_KEY from 'fetch-module';

class FetchPhotos extends Component {
	constructor(){
		super();
		this.state={
			error:false,
			more:true,
			loading: false,
			photos:[]
		};

		window.onscroll = () => {
			const{
				loadMorePhotos,
				state:{
					error,
					more,
					loading,
				},
			} = this;

			if (error || loading || !more) return; 

			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
				loadMorePhotos();
			}
		}
	}
	componentDidMount(){
		this.loadMorePhotos();
	}

	loadMorePhotos = () => {
		this.setState({loading:true}, ()=>{fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key='+REACT_APP_FLICKR_KEY+'&per_page=5&format=json&nojsoncallback=1')
			.then (res => res.json())
  			.then (json => {
  				const morePhotos = json.photos.photo.map(phot => {
  					let imgSrc = 'https://farm'+phot.farm+'.staticflickr.com/'+phot.server+'/'+phot.id+'_'+phot.secret+'.jpg';
  					return (
  						<li id="container"key = {phot.id}>
				{phot.title ? 
					<p id= "title">{phot.title}</p> : <p id="title">No title</p>}
					<div id="image-container">
						<img id="image" alt={phot.title} src={imgSrc}/>
					</div>
				</li>
  						);
  				});
  				this.setState({
  				more: this.state.photos.length < 100,
  				loading:false,
  				photos: [
  				...this.state.photos,
  				...morePhotos,]
  			});
  			});
  			
  		})
		
	}

	render(){
		return(
			<div>
			<div>
			{this.state.photos}
			</div>
			{this.state.loading ? 
				<div id="message">
					Loading.....
				</div> : ''}
			{!this.state.more ? 
			<div id="message">
				There are no more pictures...
			</div> : ''}
			</div>
			)			
	}
}


export default FetchPhotos;;
