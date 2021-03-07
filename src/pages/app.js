// import {Link as GatsbyLink} from "gatsby" import PropTypes from "prop-types"
import React, {useState, useRef, useEffect} from "react"
import {
    Box,
    Heading,
    IconButton,
    Center,
    Container,
    Stack,

    Spacer
} from '@chakra-ui/react'
import splitbee from '@splitbee/web';

// import the tensorflow js and teachable machine library
import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image';

// import the webcam as th source
import Webcam from 'react-webcam'

import Metatags from '../components/metatags'
import CorgImg from '../images/corgy-porgy.png'

import {RiCameraSwitchLine, RiCameraSwitchFill, RiCameraFill, RiCameraOffFill} from "react-icons/ri";

import '../styles/app.css'

export default function App() {
    splitbee.init();

    //iniate the default state
    const [camState,
        setCamState] = useState("on");

    const [camFace,
        setCamFace] = useState('environment');

    const webcamRef = useRef(null);

    const videoConstraints = {
        facingMode: camFace
    };

    splitbee.track('visit Corgy Porgy');
    
    //call the Teachable Machine model, edit the URL if you make your own model.
    const URL = 'https://teachablemachine.withgoogle.com/models/2U4U3j1Zm/';

    let model;
    let nameLabel;
    let ctaLabel;
    let maxPredictions;

        // initiate the model
    async function init() {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        window.requestAnimationFrame(loop);

        nameLabel = document.getElementById('current-prediction');
        ctaLabel = document.getElementById('cta-text');
    }

    //looping the model prediction function
    async function loop() {
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Get the top prediction, you will get "Corgi" inside the prediction[0] when the camera detects a corgi
            const prediction = await model.predictTopK(video, maxPredictions = 13, false);

            // change the label caption and its style whether the camera capture corgi or not a corgi
            nameLabel.innerText = prediction[0].className;
            if (nameLabel.innerText === "Corgi") {
                document
                    .getElementById('result-panel')
                    .className = "object-success";
                    ctaLabel.innerText = 'Hello cutie!!';
            } else {
                document
                    .getElementById('result-panel')
                    .className = "object-failed";
                    ctaLabel.innerText = 'Face the camera to your pet';
            }
        }

    }


    useEffect(() => {
        init()
    });

    // utils to change states (camera mode and camera face)
    function turnOffCamera() {
        if (camState === "on") {
            setCamState('off');
            // webcam.stop()
        } else {
            setCamState('on');
            // webcam.play()
        }
    }

    function changeCamera() {
        if (camFace === 'environment') {
            setCamFace('user');
        } else {
            setCamFace('environment');
        }
    }

    return (
        <Box bgColor="#FBECDB">
            <Metatags/>
            <Container centerContent maxW="xl" height="100vh" pt="0" pb="0">
                <Box id="webcam-container">
                    <Center id="panel-center">
                        <Stack
                            direction="column"
                            spacing={4}
                            bgColor="white"
                            id="result-panel"
                            borderRadius="md"
                            shadow="lg">
                            <Heading id="current-prediction" as="h1" size="2xl" p={4} pt={6} pb={6}>Loading. . .</Heading>
                        </Stack>
                        {camState === 'on'
                            ? <Webcam
                                    id='webcam'
                                    ref={webcamRef}
                                    videoConstraints={videoConstraints}
                                    muted={true}/>
                            : <div id="webcam"></div>}
                    </Center>
                </Box>
                <Stack direction="column">
                    <Box height="40vh" width="100%">
                    </Box>
                    <Center mb={20}>
                    <Stack direction="column" 
                            spacing={4}>
                                <Center>
                                <img src={CorgImg} alt="corgy porgy logo"/>
                                </Center>
                                <Heading as='h2' size='2xl' colorScheme="gray">Corgy Porgy</Heading>
                        </Stack>
                        </Center>
                    <Stack direction="row" mt={20}>
                        <IconButton
                            bgColor="#DB93A5"
                            aria-label="switch cam"
                            isRound
                            color="#fff"
                            variant="solid"
                            icon={camFace === 'environment'
                            ? <RiCameraSwitchLine size={20}/>
                            : <RiCameraSwitchFill size={20}/>}
                            onClick={() => changeCamera()}
                            size="lg"/>
                            <Spacer />
                        <IconButton
                            aria-label="switch cam"
                            bgColor="#8EA4C8"
                            color="#fff"
                            isRound
                            variant="solid"
                            icon={camState === 'on'
                            ? <RiCameraFill size={20}/>
                            : <RiCameraOffFill size={20}/>}
                            onClick={() => turnOffCamera()}
                            size="lg"/>
                    </Stack>
                    <Box id="call-to-action" mt={10} borderRadius="lg" textAlign="center">
                        <Heading id="cta-text" as="h4" size="xs" p={2}></Heading>
                    </Box>
                </Stack>
            </Container>

        </Box>

    )
}
