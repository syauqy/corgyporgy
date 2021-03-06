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

            // 4. TODO - Make Detections e.g. const obj = await net.detect(video);
            const obj = await net.detect(video);
            if(obj.length > 0){
                var detectedObj = obj[0].class;
                document.getElementById('current-prediction').innerText = detectedObj;
                // console.log(obj[0].class);

                if(detectedObj === "bottle"){
                    // console.log('success');
                    document.getElementById('result-panel').className = "object-success";
                }else{
                    // console.log('failed');
                    document.getElementById('result-panel').className = "object-failed";
                }
            }
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
        <Box bgColor="#FBECDB">
            <Metatags />
            <Container centerContent maxW="xl" height="100vh" pt="0" pb="0">
                <Box id="webcam-container">
                    <Center id="panel-center">
                    <Stack direction="column" spacing={4} bgColor="white" id="result-panel" borderRadius="md" shadow="lg">
                            <Heading id="current-prediction" as="h1" size="2xl" p={4} pt={6} pb={6}>Loading. . .</Heading>
                        </Stack>
                        {camState === 'on'
                            ? <Webcam id='webcam' ref={webcamRef} videoConstraints={videoConstraints} muted={true}/>
                            : <div id="webcam"></div>}
                    </Center>
                </Box>
                <Stack direction="column">
                    <Box height="75vh" width="100%">
                    </Box>
                    <Stack direction="row" spacing={10}>
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

        </Box>

    )
}
