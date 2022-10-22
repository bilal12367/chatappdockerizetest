import React from 'react'
import useFetch from "../../../context/useFetch";
import { TailSpin } from 'react-loader-spinner'
import { UserItem } from "../../../components/UserItem";
import { useAppContext } from '../../../context/AppContext';

const UsersList = ({url2}) => {
    const {user} = useAppContext();
    const { data, loading, error, refetch } = useFetch(
        url2 + "/api/v1/getAllUsers"
      );
    if(data){
    }
    return (
        <div
            // className="card shadow-sm h-100"
            className='d-flex flex-column w-100'
            style={{
                borderRadius: "0px",
                paddingBottom:'30px'
            }}
        >
            {loading && (
                <div
                className="w-100 d-flex flex-column justify-content-center align-items-center"
                style={{ height: '100%'  }}
              >
                <div className='p-2 d-flex flex-column align-items-center center'>
                  <TailSpin color="blue" />
                  <p>Loading Please Wait...</p>
                </div>
              </div>
                // <div className="h-100 d-flex flex-row justify-content-center align-items-center">
                //     <TailSpin height='50px' width='50px' color="var(--primary-color)" />
                // </div>
            )}
            {!loading &&
                data &&
                Object.values(data.users).map((item) => {
                    if (item.user._id != user._id) {
                        return <UserItem key={Math.random() * 1000} userItem={item} />;
                    } else {
                        return (<div key={Math.random() * 1000}></div>)
                    }
                })}
        </div>
    )
}

export default UsersList