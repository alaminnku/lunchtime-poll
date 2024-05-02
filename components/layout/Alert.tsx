import { MdErrorOutline } from 'react-icons/md';
import styles from './Alert.module.css';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { inter } from '@lib/utils';
import { useEffect, useState } from 'react';
import { useAlert } from '@contexts/Alert';

export default function Alert() {
  const { alert } = useAlert();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (alert) {
      setShowAlert(true);
      timeoutId = setTimeout(() => setShowAlert(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [alert]);

  return (
    <div
      className={`${styles.alert} ${showAlert && styles.show_alert} ${
        alert?.type === 'success' && styles.success
      } ${alert?.type === 'failed' && styles.failed} ${inter.className}`}
    >
      <p>
        {alert?.type === 'success' ? (
          <IoMdCheckmarkCircleOutline className={styles.icon} />
        ) : (
          <MdErrorOutline className={styles.icon} />
        )}
        {alert?.message}
      </p>
    </div>
  );
}
