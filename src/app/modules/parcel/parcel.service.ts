const createParcel = async (payload: any, decodedToken: any) => {
  console.log("create parcel hit \n");
  console.log(payload);
  console.log(decodedToken);
};

export const ParcelService = { createParcel };
