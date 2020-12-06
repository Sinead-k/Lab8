import React from 'react';
import {MovieItem} from './movieItem';

export class Movies extends React.Component{

    render(){
        return this.props.movies.map((movie)=>{
            //console.log({movie});
            return <MovieItem key={movie._id} movie={movie}
            ReloadDataMethod={this.props.ReloadDataMethod}></MovieItem>
            
        })
    }
}