import React, { useEffect } from 'react';
import { queryString } from '../../../../helpers/helpers';

function PDF(props) {
    const parameters = {
        image: queryString('cv'),
    }
    return (
        <div>
            <img src={"http://localhost:8888/backend-web/public" + (parameters.image?'/upload/apply/'+parameters.image:'/local/default.png')} alt="" />
        </div>
    );
}
export default PDF;