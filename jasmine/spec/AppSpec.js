describe("app", function() {
	
  beforeEach(function() {
	app.register("test-module", function(sandbox){
		return {
			init: function(){
				this.started = true;
			},

			destroy: function(){
				this.started = false;
			}
		}
	})
	app.register("test-module-2", function(sandbox){
		return {
			init: function(){
				this.started = true;
			},

			destroy: function(){
				this.started = false;
			}
		}
	})
  });

  it("should be able to register a module", function() {

	expect(typeof app.getModuleData("test-module")).toEqual("object");

  });

  describe("when the application starts all modules", function() {
    beforeEach(function() {
		
		app.startAll();

    });

    it("should call each modules init method", function() {
      expect(app.getModuleData("test-module").instance.started).toBe(true);
	  expect(app.getModuleData("test-module-2").instance.started).toBe(true);
    });

  });

  describe("when the application stops all modules", function() {
    beforeEach(function() {
		
		app.stopAll();

    });

    it("should call each modules destroy method", function() {
      expect(app.getModuleData("test-module").instance).toBeNull();
	  expect(app.getModuleData("test-module-2").instance).toBeNull();
    });

  });

  describe("when a module starts", function() {
    beforeEach(function() {
		
		app.start("test-module");	

    });

    it("should call the modules init method", function() {
      expect(app.getModuleData("test-module").instance.started).toBe(true);
    });

  });

  describe("when a module stops", function() {
    beforeEach(function() {
		
		app.stop("test-module");

    });

    it("should call the modules destroy method", function() {
      expect(app.getModuleData("test-module").instance).toBeNull();
    });

  });


});