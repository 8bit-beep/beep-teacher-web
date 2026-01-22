import Image from "next/image";

const SkeletonUser = () => {
  return (
    <div className="w-full flex items-center gap-2">
      <Image
        src={"/default-profile.svg"}
        alt="User Profile"
        width={40}
        height={40}
        className="w-6 h-6"
      />
      <p className="text-caption1 text-greyscale-60">불러오는 중...</p>
    </div>
  );
};

export default SkeletonUser;
