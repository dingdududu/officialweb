import React from 'react';

const Body: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div
          className="flex flex-col items-start"
          style={{ marginLeft: 150 }}
        >
          <h1
            className="font-bold text-white mb-[10px]"
      style={{ fontSize: 26, lineHeight: "30px", height: 30 }}
    >
      测试字体多鑫
    </h1>
    <h2
      className="text-white"
      style={{ fontSize: 18, lineHeight: "30px", height: 30, width: 500 }}
    >
      由于6月全月共有1.2万亿元买断式逆回购到期，两次买断式逆回购操作后全月将实现净投放。业内专家表示，6月处于半年末流动性考核的关键节点，又叠加同业存单大规模到期等因素，全月金融机构对流动性需求较高，中国人民银行提前提供中期资金支持，体现了对市场的呵护
    </h2>
  </div>
</section>
    </div>
  );
};

export default Body;