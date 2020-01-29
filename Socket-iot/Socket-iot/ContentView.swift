//
//  ContentView.swift
//  Socket-iot
//
//  Created by rajan twanabashu on 1/29/20.
//  Copyright © 2020 javra. All rights reserved.
//

import SwiftUI
class WaterLevelControl: ObservableObject {
    static let shared: WaterLevelControl = WaterLevelControl()
    @Published var overheadSensor1: Bool = false {
        didSet {
            print("overheadSensor1 \(self.overheadSensor1)")
            SocketIOManager.shared.socket.emit("ot1", self.overheadSensor1)
        }
    }
    @Published var overheadSensor2: Bool = false {
        didSet {
            print("overheadSensor2 \(self.overheadSensor2)")
            SocketIOManager.shared.socket.emit("ot2", self.overheadSensor2)
        }
    }
    @Published var undergroundSensor1: Bool = false {
        didSet {
            print("undergroundSensor1 \(self.undergroundSensor1)")
            SocketIOManager.shared.socket.emit("dt1", self.undergroundSensor1)
        }
    }
    @Published var undergroundSensor2: Bool = false {
        didSet {
            print("undergroundSensor2 \(self.undergroundSensor2)")
            SocketIOManager.shared.socket.emit("dt2", self.undergroundSensor2)
        }
    }
    @Published var manualOnOff: Bool = false {
        didSet {
            print("manualOnOff \(self.manualOnOff)")
            SocketIOManager.shared.socket.emit("manual", self.manualOnOff)
        }
    }
}

struct ContentView: View {
    @ObservedObject var control: WaterLevelControl = WaterLevelControl.shared
    
    
    
    var body: some View {
        
        return Form{
            Toggle("Over Head Sensor 1", isOn: $control.overheadSensor1)
            Toggle("Over Head Sensor", isOn: $control.overheadSensor2)
            Toggle("Under Ground Sensor 1", isOn: $control.undergroundSensor1)
            Toggle("Under Ground Sensor 2", isOn: $control.undergroundSensor2)
            Toggle("Manual Switch", isOn: $control.manualOnOff)
            
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
