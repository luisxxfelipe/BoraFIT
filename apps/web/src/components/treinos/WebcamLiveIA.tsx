import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, Text, Button } from '@chakra-ui/react';

interface WebcamLiveIAProps {
  onAddPose: (pose: { nome: string; landmarks: any; image_base64: string }) => void;
  finalizado: boolean;
}

export const WebcamLiveIA: React.FC<WebcamLiveIAProps> = ({ onAddPose, finalizado }) => {
  const webcamRef = useRef<Webcam>(null);
  const orientacoes = [
    'Pose 1: Fique de frente para a câmera, braços relaxados ao lado do corpo.',
    'Pose 2: Fique de lado (perfil direito), braços relaxados.',
    'Pose 3: Fique de costas para a câmera, postura ereta.',
    'Pose 4: Fique de lado (perfil esquerdo), braços relaxados.',
    'Pose 5: Agache de frente para a câmera, braços à frente.',
    'Pose 6: Fique de frente, braços erguidos acima da cabeça.'
  ];
  const [poseIndex, setPoseIndex] = useState(0);
  const [timer, setTimer] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const [capturedCount, setCapturedCount] = useState(0);

  // Inicia cronômetro ao clicar em "Iniciar captura"
  const startCountdown = () => {
    setIsCounting(true);
    setTimer(5);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          capturePose();
          setIsCounting(false);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Captura a pose atual
  const capturePose = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const landmarks = null;
        const nome = orientacoes[poseIndex].split(':')[0];
        const pose = { nome, landmarks, image_base64: imageSrc.replace(/^data:image\/jpeg;base64,/, '') };
        onAddPose(pose);
        setCapturedCount(capturedCount + 1);
        if (poseIndex < orientacoes.length - 1) {
          setPoseIndex(poseIndex + 1);
        }
      }
    }
  };

  // Só permite capturar se ainda não capturou todas as poses (até 6)
  const podeCapturar = poseIndex < orientacoes.length && capturedCount === poseIndex;

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', borderRadius: '8px' }}
      />
      {!finalizado && podeCapturar && (
        <Box mt={4}>
          <Text color="#a259ff" fontWeight="bold">{orientacoes[poseIndex]}</Text>
          {!isCounting ? (
            <Button colorScheme="purple" mt={2} onClick={startCountdown}>Iniciar Captura</Button>
          ) : (
            <Text fontSize="2xl" mt={2}>Capturando em {timer}s...</Text>
          )}
        </Box>
      )}
    </Box>
  );
};
