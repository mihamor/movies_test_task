import React from 'react';
import Dialog from 'react-native-dialog';

const {
  Container,
  Title,
  Description,
  Button,
} = Dialog;


type Props = {
  visible: boolean,
  title: string,
  description: string,
  onReject: () => void,
  onConfirm: () => void,
  onBackdropPress: () => void,
};

const ConfirmModal: React.FC<Props> = ({
  visible,
  title,
  description,
  onConfirm,
  onBackdropPress,
  onReject,
}: Props) => {
  return (
    <Container
      onBackdropPress={onBackdropPress}
      visible={visible}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Button label="Confirm" onPress={onConfirm} />
      <Button label="Reject" onPress={onReject} />
    </Container>
  );
};

export default ConfirmModal;
