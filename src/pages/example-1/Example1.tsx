import React from 'react';
import './Example1.css';

const Example2: React.FC = () => {
  return (
    <div className="content">
      <h1 className="title">Example 1</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Certificate type</th>
              <th>Valid from</th>
              <th>Valid to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DAIMLER AG, 1, Berlin</td>
              <td>Permission of Printing</td>
              <td>21.08.2017</td>
              <td>26.08.2017</td>
            </tr>
            <tr>
              <td>ANDEMIS GmbH, 1, Stuttgart</td>
              <td>OHSAS 18001</td>
              <td>18.08.2017</td>
              <td>24.08.2017</td>
            </tr>
            <tr>
              <td>ANDEMIS GmbH, 1, Stuttgart</td>
              <td>Permission of Printing</td>
              <td>04.10.2017</td>
              <td>10.10.2017</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example2;
