import React from 'react';
import { GestureResponderEvent, Pressable, Modal as RNModal, View } from 'react-native';
import T from './T';

type ModalAction = {
  label: string;
  onPress: () => void;
  closeModal?: boolean;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: ModalAction[];
}

export default function Modal({ isOpen, onClose, title, children, actions = [] }: ModalProps) {
  const handleContainerPress = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <RNModal animationType='slide' transparent={true} visible={isOpen} onRequestClose={onClose}>
      <Pressable
        id='modal-container'
        className='flex-1 justify-center items-center bg-black/50'
        onPress={handleContainerPress}
      >
        <View className='w-4/5 bg-surface rounded-lg p-4'>
          {title && (
            <T font='header' weight='bold' className='text-xl text-center mb-4 capitalize'>
              {title}
            </T>
          )}
          <View className='mb-4'>{children}</View>
          {actions.length > 0 && (
            <View className='flex-row justify-end'>
              {actions?.map((action, index) => (
                <Pressable
                  key={index}
                  className='py-2 px-4'
                  onPress={() => {
                    action.onPress();
                    if (action.closeModal) {
                      onClose();
                    }
                  }}
                >
                  <T className='text-lg'>{action.label}</T>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </Pressable>
    </RNModal>
  );
}
