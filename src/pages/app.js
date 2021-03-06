// import {Link as GatsbyLink} from "gatsby"
// import PropTypes from "prop-types"
import React, {useState, useRef, useEffect} from "react"
import {
    // useColorMode,
    // Button,
    // Flex,
    Box,
    // Spacer,
    Heading,
    IconButton,
    Center,
    Container,
    // Text,
    // VStack,
    Stack,
    // Link
} from '@chakra-ui/react'
import * as tf from '@tensorflow/tfjs'
import * as cocoSSD from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'

import Metatags from '../components/metatags'

import { RiCameraSwitchLine, RiCameraSwitchFill, RiCameraFill, RiCameraOffFill } from "react-icons/ri";

// import {ArrowForwardIcon} from '@chakra-ui/icons'
// import {FaGithub} from "react-icons/fa";

// import '@tensorflow/tfjs-backend-webgl';

import '../styles/app.css'

export default function App() {

    const [camState,
        setCamState] = useState("on");

    const [camFace, setCamFace] = useState('user');

    const webcamRef = useRef(null);
    // const canvasRef = useRef(null);

    const runCoco = async() => {
        const net = await cocoSSD.load();

        //loop to detect corgi
        setInterval(() => {
            detect(net);
        }, 10)
    }

    const videoConstraints = {
        // cameFace === 'user'? 
        facingMode: camFace
      };

    const detect = async(net) => {
        // Check data is available
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas height and width   canvasRef.current.width = videoWidth;
            // canvasRef.current.height = videoHeight;

            // 4. TODO - Make Detections e.g. const obj = await net.detect(video);
            const obj = await net.detect(video);
            console.log(obj);

            // Draw mesh   const ctx = canvasRef.current.getContext("2d");

            // 5. TODO - Update drawing utility drawSomething(obj, ctx)
        }
    };

    useEffect(() => {
        runCoco()
    });

    function turnOffCamera() {
        if (camState === "on") {
            setCamState('off');
        } else {
            setCamState('on');
        }
    }

    function changeCamera(){
        if(camFace === 'environment'){
            setCamFace('user');
        }else{
            setCamFace('environment');
        }
    }

    return (
        <div>
            <Metatags />
            <Container centerContent pt="8" pb="8">
                <Box id="webcam-container" bgColor="#FBECDB">
                    <Center>
                        {camState === 'on'
                            ? <Webcam id='webcam' ref={webcamRef} videoConstraints={videoConstraints} muted={true}/>
                            : <div id="webcam" background="black"></div>}
                    </Center>
                </Box>
                <Stack direction="column">
                    <Box height="70vh">
                        <Stack direction="column" spacing={4}>
                            <Heading></Heading>
                        </Stack>
                    </Box>
                    <Stack direction="row" spacing={8}>
                    <IconButton bgColor="#DB93A5" aria-label="switch cam"
                    isRound
                    color="#fff"
                            variant="solid"
                            icon={camFace === 'environment'
                            ? <RiCameraSwitchLine size={20} />
                            : <RiCameraSwitchFill size={20} />}
                            onClick={() => changeCamera()}
                            size="lg" />
                    <IconButton aria-label="switch cam"
                    bgColor="#8EA4C8"
                    color="#fff"
                    isRound
                            variant="solid"
                            icon={camState === 'on'
                            ? <RiCameraFill size={20} />
                            : <RiCameraOffFill size={20} />}
                            onClick={() => turnOffCamera()}
                            size="lg" />
                    </Stack>
                </Stack>
            </Container>

        </div>

    )
}
