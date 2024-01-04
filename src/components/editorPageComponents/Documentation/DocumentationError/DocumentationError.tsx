import GQL_SCHEMA from '@/consts/GQL_SCHEMA';
import styles from '@/components/editorPageComponents/Documentation/DocumentationInfo/documentationInfo.module.scss';

function DocumentationError(): JSX.Element {
  return (
    <>
      <h2>{GQL_SCHEMA.WRONG_URL_TITLE}</h2>
      <p className={styles.documentationInfo__errorMessage}>
        {GQL_SCHEMA.WRONG_URL_MESSAGE}
      </p>
    </>
  );
}

export default DocumentationError;
