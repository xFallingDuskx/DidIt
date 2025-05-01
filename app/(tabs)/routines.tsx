import { T, TabView } from '../../components';

export default function Screen() {
  return (
    <TabView className="relative items-center justify-center">
      <T weight="bold" className="text-2xl">
        Routines
      </T>
      <T className="text-lg text-gray-500">This is the Routines screen.</T>
      <T className="absolute bottom-0">Test</T>
    </TabView>
  );
}
