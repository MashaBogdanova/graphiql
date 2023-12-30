import styles from './endpointInput.module.scss';
import Button from '@/components/ui/Button';
import { useState } from 'react';

interface Props {
  setEndpoint: (endpoint: string) => void;
}

function EndpointInput({ setEndpoint }: Props): JSX.Element {
  let initialValue;
  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem('endpoint');
  }
  const [value, setValue] = useState<string>(initialValue || '');

  function handleSubmit(): void {
    setEndpoint(value);
    localStorage.setItem('endpoint', `${value}`);
  }

  return (
    <div className={styles.endpoint}>
      <input
        className={styles.endpoint__input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        title="Change"
        type="button"
        styleType="light"
        callback={handleSubmit}
      />
    </div>
  );
}

export default EndpointInput;
