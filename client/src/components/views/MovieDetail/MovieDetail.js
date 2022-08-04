import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {

    // movieId 값을 가져오기 위해(구버전))
    // let moivieId = props.match.params.movieId

    // <참고> 최신버전에서는 route props[match, history, location]를 이용할 수 없기 때문에
    // useParams를 사용해야 함

    const [Movie, setMoive] = useState([])

    const { movieId } = useParams()

    // DOM이 렌더링될 때 할 것을 넣어주면 됨
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMoive(response);
            })


        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseForCrew',response);
            })
    }, [])


    return (
        <div>
            {/* Header */}
            {Movie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}



            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* Movie Info */}
                <MovieInfo
                    movie={Movie}
                />

                <br />
                {/* Actors Grid */}

                <div style={{ dispaly: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button> Toggle Actor View </button>

                </div>

            </div>

        </div>
    )
}

export default MovieDetail