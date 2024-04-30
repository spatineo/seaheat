export interface WMSCapabilitiesType {
  Service: Service
  Capability: Capability
}

interface Capability {
  Layer: Layer
  Request: Request
}

interface Request {
  [key: string]: OnlineResource
}

interface OnlineResource {
  DCPType: Array<DCPType>
  Format: Array<string>
}

interface DCPType {
  HTTP: {
    Get: {
      OnlineResource: string
    }
  }
}

interface Service {
  OnlineResource: string
}

export interface Layer {
  Title: string
  Name?: string
  Layer: Array<Layer>
  Dimension?: Array<Dimension>
}

interface Dimension {
  name: string
  values: string
}
