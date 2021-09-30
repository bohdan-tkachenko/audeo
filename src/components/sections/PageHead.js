import css from './PageHead.module.css';

function PageHead() {
  return (
    <div className={css.container}>
      <button><i className="fa fa-arrow-left"/> Back</button>
      <button><i className="fa fa-bars"/></button>
    </div>
  );
}

export default PageHead;
