import { Checkbox, Collapse } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { openNotification } from '../../components/Smart/Notification';
import { getCollectionTraitsFilter } from '../../services/collectionServices';

const { Panel } = Collapse;

const FiltersSection = ({ collectionid }) => {
  const [collectionTraitsFilter, setCollectionTraitFilter] = useState(null);
  const [selectedTraitsFilter, setSelectedTraitsFilter] = useState([]);

  const parseFilters = (data) => {
    const tempArray = [];
    for (let i = 0; i < data?.length; i++) {
      const findItem = tempArray.find((item) => item.trait_type == data[i].trait_type);
      if (findItem) {
        findItem.value.push(data[i].value);
      } else {
        tempArray.push({
          trait_type: data[i].trait_type,
          value: [data[i].value],
        });
      }
    }
    return tempArray;
  };

  const handleCheck = ({ value, type }) => {
    const findItem = selectedTraitsFilter.find((item) => item == `${type}=${value}`);
    console.log('findItem', findItem);
    if (findItem) {
      const temArray = selectedTraitsFilter?.filter((item) => item != findItem);
      setSelectedTraitsFilter([...temArray]);
    } else {
      setSelectedTraitsFilter([...selectedTraitsFilter, `${type}=${value}`]);
    }
  };

  const handleIfIsChecked = ({ value, type }) => {
    console.log('i am called');
    const findItem = selectedTraitsFilter.find((item) => item == `${type}=${value}`);
    return findItem?.length ? true : false;
  };

  useEffect(async () => {
    try {
      const resp = await getCollectionTraitsFilter(collectionid);
      const result = parseFilters(resp?.data?.body?.data);
      setCollectionTraitFilter(result);
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  }, [collectionid]);
  console.log('collectionTraitsFilter', collectionTraitsFilter);
  return (
    <>
      <div className='filtersSection'>
        <Collapse defaultActiveKey={[]} bordered={false} expandIconPosition='end'>
          {collectionTraitsFilter?.map((item, index) => {
            return (
              <Panel header={<span className='filtersHeader'>{item.trait_type}</span>} key={index}>
                {item?.value?.map((itemValue) => (
                  <p key={'item' + itemValue}>
                    <Checkbox
                      onClick={() => handleCheck({ value: itemValue, type: item.trait_type })}
                      // defaultChecked={() =>
                      //   handleIfIsChecked({ value: itemValue, type: item.trait_type })
                      // }
                    >
                      {itemValue}
                    </Checkbox>
                  </p>
                ))}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </>
  );
};

export default FiltersSection;
