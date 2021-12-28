import React from "react";
import { Menu, Dropdown, Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

function HeaderButton({ title, menuItems, image }) {
  const rate = 0.7;
  const boldTitle = ({ title, bolder }) => (
    <span
      className="header-button-bold-title"
      style={{
        fontWeight: bolder ? 900 : 700,
      }}
    >
      {title}
    </span>
  );

  const menu = (
    <Menu>
      <Row>
        <Col style={{ padding: 20 }}>
          {Array.isArray(menuItems) &&
            menuItems.map((item, i) => (
              <Menu.Item key={i}>
                <Link href={item?.link}>
                  {boldTitle({ title: item?.title })}
                </Link>
              </Menu.Item>
            ))}
        </Col>
        {image && (
          <Col style={{ marginLeft: 20, padding: 20 }}>
            <Image
              src={image}
              alt={`product-${image}`}
              width={400 * rate}
              height={600 * rate}
            />
          </Col>
        )}
      </Row>
    </Menu>
  );
  return (
    <Link href={"/"}>
      {Array.isArray(menuItems) ? (
        <Dropdown overlay={menu} placement="bottomLeft">
          {boldTitle({ title, bolder: true })}
        </Dropdown>
      ) : (
        boldTitle(title)
      )}
    </Link>
  );
}

export default HeaderButton;
