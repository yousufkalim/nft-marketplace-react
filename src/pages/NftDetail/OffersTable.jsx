import { Table } from "antd";
import React from "react";
import TEST_ICON from "../../images/test_footer.svg";
import "./OffersTable.scss";

const OffersTable = () => {
  const data = [
    {
      id: 1,
      image: TEST_ICON,
      name: "Phil Lee",
      bid: "49.4 eth",
      usdPrice: "$598.82",
      date: "4/15/2022",
    },
    {
      id: 1,
      image: TEST_ICON,
      name: "Phil Lee",
      bid: "49.4 eth",
      usdPrice: "$598.82",
      date: "4/15/2022",
    },
    {
      id: 1,
      image: TEST_ICON,
      name: "Phil Lee",
      bid: "49.4 eth",
      usdPrice: "$598.82",
      date: "4/15/2022",
    },
    {
      id: 1,
      image: TEST_ICON,
      name: "Phil Lee",
      bid: "49.4 eth",
      usdPrice: "$598.82",
      date: "4/15/2022",
    },

  ];
  const columns = [
    {
      title: 'Bidder',
      dataIndex: 'name',
      key: 'name',
      render: (value,image) => <><img src={image} />{value}</>,
    //   width: 150,
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      key: 'bid',
    //   width: 80,
    },
    {
        title: 'USD Price',
        dataIndex: 'usdPrice',
        key: 'usdPrice',
      //   width: 80,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      //   width: 80,
      },
  ];
  
  return (
    <div className="offersWrapper">
      <span className="title">Offers</span>
      <Table columns={columns} dataSource={data} />;
      {/* <div>
        <div className="columns">
          <span>Bidder</span>
          <span>Bid</span>
          <span>USD Price</span>
          <span>Date</span>
        </div>
        <>
          {data.map((item, index) => {
            return (
              <div className="columnData" key={index}>
                <span>
                  <img src={item.image} />
                  <span>{item.name}</span>
                </span>
                <span>{item.bid}</span>
                <span>{item.usdPrice}</span>
                <span>{item.date}</span>
              </div>
            );
          })}
        </>
      </div> */}
    </div>
  );
};

export default OffersTable;
