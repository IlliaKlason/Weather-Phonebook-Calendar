import Appear from 'components/Appear';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '../common/Input';

function Filter({filterChangeInput,value}) {
  const { t } = useTranslation();

  return (
    <Appear time={350}>
    <Input
      label={t("filter.labelName")}
      type="text"
      onChange={(event)=>filterChangeInput(event.target.value)}
      name="filter"
      value={value}
      />
      </Appear>
  );
}

Filter.propTypes = {
  filterChangeInput: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;

