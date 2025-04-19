import React from 'react';
import { Pressable, Modal as RNModal, Text, View } from 'react-native';

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
  return (
    <RNModal animationType='slide' transparent={true} visible={isOpen} onRequestClose={onClose}>
      <View className='flex-1 justify-center items-center bg-black/50'>
        <View className='w-4/5 bg-surface rounded-lg p-4'>
          {title && <Text className='text-xl font-bold text-center mb-4 font-header capitalize'>{title}</Text>}
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
                  <Text className='font-body text-lg'>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}
