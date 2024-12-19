import { useRef, useState } from "react";
import Drawer from "../Drawer";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/canvasUtils";
import { uploadWithToken } from "@/hooks/useData";
import { chainId } from "@/constants/app";

interface IUploadProps {
  onFinish?: (ImgUrl: string) => void;
}

const readFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const Upload = ({ onFinish }: IUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null>();
  const [croppedImageUrl, setCropedImageUrl] = useState<string>();

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      if (croppedImage) {
        setCropedImageUrl(URL.createObjectURL(croppedImage));
        setCroppedImage(croppedImage);
        handleUpload(croppedImage);
        setImageSrc('')
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = (await readFile(file)) as string;
      setImageSrc(imageDataUrl);
    }
  };

  const handleUpload = async (imageFile: Blob) => {
    try {
      if (!imageFile) return;
      const data = new FormData();
      data.append("file", imageFile, 'image/png');
      data.append("chainId", chainId);
      const { code, data: ImgUrl } = await uploadWithToken("/api/app/file/upload", data);
      if (code === "20000") {
        onFinish?.(ImgUrl);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="w-full h-[111px] bg-tertiary flex flex-col items-center justify-center rounded-[12px] cursor-pointer overflow-hidden"
        onClick={handleClick}
      >
        {croppedImage ? (
          <img src={croppedImageUrl} className="w-full h-full object-cover" alt="Banner" />
        ) : (
          <>
            <i className="votigram-icon-back text-[24px]" />
            <span className="block text-[13px] leading-[15.6px] text-white text-center">
              Upload
            </span>
            <span className="mt-1 block text-center text-[11px] text-input-placeholder leading-[13.2px] whitespace-pre-wrap">{`Formats supported: PNG, JPG, JPEG\nRatio: 3:1 , less than 1 MB`}</span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
        />
      </div>
      <Drawer
        isVisible={!!imageSrc}
        direction="bottom"
        onClose={() => setImageSrc("")}
        rootClassName="bg-tertiary h-screen rounded-none"
      >
        <div className="relative w-full h-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            rotation={rotation}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="p-4 absolute top-0 right-0 z-10">
            <button
              className="py-2 px-4 bg-primary text-white rounded-[8px] hover:bg-primary-hover"
              onClick={showCroppedImage}
            >
              Confirm
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Upload;
