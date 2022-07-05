export interface RoverDetailsParams {
    cameras: CameraParams[];
    id: number;
    landing_date: string;
    launch_date: string;
    max_date: string;
    max_sol: number;
    name: string;
    status: string;
    total_photos: number;
}

interface CameraParams {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

export interface RoverPhotosForUsersParams {
    img_src: string;
    earth_date: string;
}