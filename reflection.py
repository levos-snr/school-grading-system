import math

class Point3D:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

class Line:
    def __init__(self, point1, point2):
        self.point1 = point1
        self.point2 = point2

    def phase(self, num_points, image_pixel, ref_beam, wavelength):
        sum_result = 0.0

        # distance from the reference source to the image plane
        drx = image_pixel.x - ref_beam.x
        dry = image_pixel.y - ref_beam.y
        drz = image_pixel.z - ref_beam.z
        ref_dist = math.sqrt(drx*drx + dry*dry + drz*drz)
        t_increment = 1.0 / num_points
        pdx = self.point2.x - self.point1.x
        pdy = self.point2.y - self.point1.y
        pdz = self.point2.z - self.point1.z

        # This loop will calculate all the points that make up the line
        for t in [i * t_increment for i in range(num_points + 1)]:
            # compute all the points that make up the line
            x = self.point1.x + t * pdx
            y = self.point1.y + t * pdy
            z = self.point1.z + t * pdz

            # distance from the line to the image plane
            dx = x - image_pixel.x
            dy = y - image_pixel.y
            dz = z - image_pixel.z
            distance = math.sqrt(dx*dx + dy*dy + dz*dz)

            # distance from the line to the reference source
            dx = x - ref_beam.x
            dy = y - ref_beam.y
            dz = z - ref_beam.z
            distance2 = math.sqrt(dx*dx + dy*dy + dz*dz)

            # the phase of light of the line is the average sum of all the phases of points
            sum_result += math.cos((distance + distance2 - ref_dist) / wavelength)

        return sum_result


