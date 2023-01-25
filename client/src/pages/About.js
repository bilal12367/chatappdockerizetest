import { React, memo } from 'react'
import { useAppContext } from '../context/AppContext'
import './css/About.css'
import ImageComponent from '../components/Image.js'
import RowSkill from '../components/RowSkill'
import FlipCard from '../components/FlipCard'
// import { Tree } from 'react-tree-graph'
// import 'react-tree-graph/dist/style.css'

const About = () => {
  const { isLoading, user } = useAppContext()
    return (
      <div
        className="bg-light w-100 d-flex flex-column align-items-center card shadow"
        style={{ height: '87vh', borderRadius: '15px', overflowY: 'scroll' }}
      >
        <div
          className="w-100 row justify-content-between st-pad"
          style={{
            paddingTop: '10%',
            paddingBottom: '0%',
            backgroundColor: '#EFEFEF',
          }}
        >
          <div className="col-lg-7 col-12">
            <h1 className="head1">
              Hi! There I am{' '}
              <span style={{ fontWeight: 'bold', color: '#FF7F3F' }}>
                Bilal
              </span>
              .
            </h1>
            <p className="sub1" style={{ marginTop: '40px' }}>
              I am a Blockchain and Web Developer.
            </p>
          </div>
          <div className="col-lg-5 col-12">
            <div className='d-flex flex-column justify-content-end' style={{height:'100%',padding:'0% 20%'}}>
              <img
                src={require('../assets/profile_pic.png')}
                alt=""
                width="100%"
              />
            </div>
          </div>
        </div>
        {/* <div
          className="w-100 d-flex st-pad"
          style={{
            backgroundColor: '#413F42',
            color: 'white',
          }}
        >
          <h1 className="head1 flex-fill">Currently working at Infosys</h1>
        </div> */}

        <div className="w-100 d-flex flex-column bg1 pad1">
          {/* <RowSkill type={'normal'} img={require('../assets/solidity.png')} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"}/>
          <RowSkill type={'reverse'} img={require('../assets/solidity.png')} content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"}/> */}
          {/* <Tree
            data={data}
            height={400}
            width={400}
            svgProps={{
              transform: 'rotate(90)',
            }}
          /> */}
          <div className="w-100 d-flex flex-column align-items-center">
            <h1 className="head2">Skills</h1>
            <div
              className="row w-100 cardsRow"
            >
              <div className="col-lg-4 col-md-6 col-12 p-4">
                
                <FlipCard
                  title="Web Development"
                  imgSrc={require('../assets/WebDev2.png')}
                  skills={[
                    { skill: 'React JS', color: '#5ed3f3' },
                    { skill: 'Angular', color: '#d6002f' },
                    { skill: 'Node JS', color: '#74ad5e' },
                    { skill: 'Express', color: 'black' },
                    { skill: 'Socket.IO', color: 'grey' },
                    { skill: 'Mongo DB', color: '#118d4d' },
                  ]}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-4">
                <FlipCard
                  title="Blockchain Development"
                  imgSrc={require('../assets/blockchain.jpg')}
                  skills={[
                    { skill: 'Solidity', color: '#636363' },
                    { skill: 'Truffle', color: '#5b444b' },
                    { skill: 'Ganache', color: '#dda160' },
                    { skill: 'Remix', color: '#373c5b' },
                    { skill: 'Hardhat', color: '#f7e84b' },
                    { skill: 'Metamask', color: '#ee811a' },
                  ]}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 p-4">
                <FlipCard
                  title="Mobile App Development"
                  imgSrc={require('../assets/AppDev.png')}
                  skills={[
                    { skill: 'Flutter + Getx', color: '#5ac2f0' },
                    { skill: 'Android Studio', color: '#7eb048' },
                    { skill: 'Firebase', color: '#f7c52c' },
                  ]}
                />
                {/* <div
                  className="d-flex flex-column w-100 p-3 align-items-center card shadow"
                  style={{ borderRadius: '14px' }}
                >
                  <h4 className='text-center sub2'>
                    Mobile App Development
                  </h4>
                  <hr />
                  <img src={require('../assets/AppDev.png')}  height='100%' width='100%'/>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default About
